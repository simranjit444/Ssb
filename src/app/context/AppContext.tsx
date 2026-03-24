import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Station {
  id: string;
  name: string;
  code: string;
}

export interface User {
  id: string;
  name: string;
  stations: Station[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  requirement: string;
  status: 'pending' | 'ok' | 'ng';
  ngData?: {
    description: string;
    remarks: string;
    suggestedAction: string;
    images: string[];
  };
}

export interface InspectionRecord {
  itemId: string;
  stationId: string;
  stationName: string;
  timestamp: string;
  inspector: string;
  status: 'ok' | 'ng' | 'pending';
  checklist: ChecklistItem[];
}

export interface ItemDetail {
  id: string;
  transactionId: string;
  inspections: InspectionRecord[];
  currentStatus: 'in-progress' | 'rework' | 'completed';
}

interface AppContextType {
  currentUser: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  currentStation: Station | null;
  setCurrentStation: (station: Station | null) => void;
  scannedItemId: string | null;
  setScannedItemId: (id: string | null) => void;
  currentInspection: InspectionRecord | null;
  setCurrentInspection: (inspection: InspectionRecord | null) => void;
  items: ItemDetail[];
  addInspection: (itemId: string, inspection: InspectionRecord) => void;
  updateInspectionItem: (itemId: string, stationId: string, checklistItemId: string, updates: Partial<ChecklistItem>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock users database
const users: Record<string, User> = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    stations: [
      { id: 'ST01', name: 'Visual Inspection 1', code: 'ST01' },
      { id: 'ST02', name: 'Visual Inspection 2', code: 'ST02' },
    ]
  },
  'user2': {
    id: 'user2',
    name: 'Jane Smith',
    stations: [
      { id: 'ST03', name: 'Assembly', code: 'ST03' },
      { id: 'ST04', name: 'Final Inspection', code: 'ST04' },
    ]
  },
  'supervisor': {
    id: 'supervisor',
    name: 'Supervisor',
    stations: [
      { id: 'ST01', name: 'Visual Inspection 1', code: 'ST01' },
      { id: 'ST02', name: 'Visual Inspection 2', code: 'ST02' },
      { id: 'ST03', name: 'Assembly', code: 'ST03' },
      { id: 'ST04', name: 'Final Inspection', code: 'ST04' },
    ]
  }
};

// Mock items with inspection history
const mockItems: ItemDetail[] = [
  {
    id: 'CAC12345',
    transactionId: 'TXN-2026-001',
    currentStatus: 'in-progress',
    inspections: [
      {
        itemId: 'CAC12345',
        stationId: 'ST01',
        stationName: 'Visual Inspection 1',
        timestamp: '2026-03-20T10:30:00',
        inspector: 'John Doe',
        status: 'ok',
        checklist: []
      }
    ]
  },
  {
    id: 'CAC12346',
    transactionId: 'TXN-2026-002',
    currentStatus: 'rework',
    inspections: [
      {
        itemId: 'CAC12346',
        stationId: 'ST01',
        stationName: 'Visual Inspection 1',
        timestamp: '2026-03-20T11:00:00',
        inspector: 'John Doe',
        status: 'ok',
        checklist: []
      },
      {
        itemId: 'CAC12346',
        stationId: 'ST02',
        stationName: 'Visual Inspection 2',
        timestamp: '2026-03-20T11:30:00',
        inspector: 'John Doe',
        status: 'ng',
        checklist: []
      }
    ]
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [scannedItemId, setScannedItemId] = useState<string | null>(null);
  const [currentInspection, setCurrentInspection] = useState<InspectionRecord | null>(null);
  const [items, setItems] = useState<ItemDetail[]>(mockItems);

  const login = (userId: string, password: string): boolean => {
    // Simple mock authentication
    if (users[userId]) {
      setCurrentUser(users[userId]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentStation(null);
    setScannedItemId(null);
    setCurrentInspection(null);
  };

  const addInspection = (itemId: string, inspection: InspectionRecord) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, inspections: [...item.inspections, inspection] }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            transactionId: `TXN-${new Date().getTime()}`,
            currentStatus: 'in-progress',
            inspections: [inspection]
          }
        ];
      }
    });
  };

  const updateInspectionItem = (
    itemId: string,
    stationId: string,
    checklistItemId: string,
    updates: Partial<ChecklistItem>
  ) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              inspections: item.inspections.map(inspection =>
                inspection.stationId === stationId
                  ? {
                      ...inspection,
                      checklist: inspection.checklist.map(checkItem =>
                        checkItem.id === checklistItemId
                          ? { ...checkItem, ...updates }
                          : checkItem
                      )
                    }
                  : inspection
              )
            }
          : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        currentStation,
        setCurrentStation,
        scannedItemId,
        setScannedItemId,
        currentInspection,
        setCurrentInspection,
        items,
        addInspection,
        updateInspectionItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
