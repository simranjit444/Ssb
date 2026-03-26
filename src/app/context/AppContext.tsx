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
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  currentStation: Station | null;
  setCurrentStation: (station: Station | null) => void;
  scannedItemId: string | null;
  setScannedItemId: (id: string | null) => void;
  currentInspection: InspectionRecord | null;
  setCurrentInspection: (inspection: InspectionRecord | null) => void;
  items: ItemDetail[];
  addInspection: (itemId: string, inspection: InspectionRecord) => void;
  updateInspectionItem: (itemId: string, stationId: string, checklistItemId: string, updates: Partial<ChecklistItem>) => void;
  canScanAtStation: (itemId: string, stationId: string) => { allowed: boolean; reason?: string };
  getItemNextStation: (itemId: string) => string | null;
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const canScanAtStation = (itemId: string, stationId: string): { allowed: boolean; reason?: string } => {
    const item = items.find(i => i.id === itemId);
    
    const stationOrder = ['ST01', 'ST02', 'ST03', 'ST04'];
    const targetStationIndex = stationOrder.indexOf(stationId);
    
    // If item doesn't exist, it's a new item - can only scan at ST01
    if (!item || item.inspections.length === 0) {
      if (stationId === 'ST01') {
        return { allowed: true };
      }
      return { allowed: false, reason: 'New items must start at Station 1 (ST01)' };
    }

    // Get the last inspection
    const lastInspection = item.inspections[item.inspections.length - 1];
    
    // If last inspection was NG, item must be rescanned at the same station for rework
    if (lastInspection.status === 'ng') {
      if (lastInspection.stationId === stationId) {
        return { allowed: true }; // Allow rework at same station
      }
      return { allowed: false, reason: `Item failed at ${lastInspection.stationId}. Must complete rework there first.` };
    }

    // Check if all previous stations have been completed with OK status
    for (let i = 0; i < targetStationIndex; i++) {
      const previousStation = stationOrder[i];
      const completedAtPreviousStation = item.inspections.some(
        inspection => inspection.stationId === previousStation && inspection.status === 'ok'
      );
      
      if (!completedAtPreviousStation) {
        return { 
          allowed: false, 
          reason: `Item must be inspected at ${previousStation} first. Sequential scanning required.` 
        };
      }
    }

    // Check if already scanned at this station with OK status
    const alreadyScannedHere = item.inspections.some(
      inspection => inspection.stationId === stationId && inspection.status === 'ok'
    );
    
    if (alreadyScannedHere) {
      return { allowed: false, reason: `Already passed inspection at ${stationId}` };
    }

    // Check if this is the correct next sequential station
    const currentStationIndex = stationOrder.indexOf(lastInspection.stationId);

    // Must be the next station in sequence (can't skip stations)
    if (targetStationIndex === currentStationIndex + 1) {
      return { allowed: true };
    }

    if (targetStationIndex <= currentStationIndex) {
      return { allowed: false, reason: `Item already completed ${stationId}. Cannot go backwards.` };
    }

    // Trying to skip stations
    const nextStation = stationOrder[currentStationIndex + 1];
    return { allowed: false, reason: `Sequential scanning required. Item must go to ${nextStation} next.` };
  };

  const getItemNextStation = (itemId: string): string | null => {
    const item = items.find(i => i.id === itemId);
    
    // New item starts at ST01
    if (!item || item.inspections.length === 0) {
      return 'ST01';
    }

    const lastInspection = item.inspections[item.inspections.length - 1];
    
    // If NG, stays at same station for rework
    if (lastInspection.status === 'ng') {
      return lastInspection.stationId;
    }

    // If OK, move to next station
    const stationOrder = ['ST01', 'ST02', 'ST03', 'ST04'];
    const currentIndex = stationOrder.indexOf(lastInspection.stationId);
    
    if (currentIndex === -1 || currentIndex === stationOrder.length - 1) {
      return null; // Completed all stations
    }

    return stationOrder[currentIndex + 1];
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        selectedCategory,
        setSelectedCategory,
        currentStation,
        setCurrentStation,
        scannedItemId,
        setScannedItemId,
        currentInspection,
        setCurrentInspection,
        items,
        addInspection,
        updateInspectionItem,
        canScanAtStation,
        getItemNextStation,
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