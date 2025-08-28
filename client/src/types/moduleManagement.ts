export interface ModuleConfig {
    id: string;
    label: string;
    icon: string;
    isActive: boolean;
    order: number;
    description?: string; 
}

export interface ModuleManagementProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (modules: ModuleConfig[]) => void;
    modules: ModuleConfig[];
}