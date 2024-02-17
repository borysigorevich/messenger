import { create } from 'zustand';

type ActiveListStore = {
	members: string[];
	addMember: (member: string) => void;
	removeMember: (member: string) => void;
	setMembers: (members: string[]) => void;
};

export const useActiveList = create<ActiveListStore>((set) => ({
	members: [],
	addMember: (member: string) =>
		set((state) => ({ members: [...state.members, member] })),
	removeMember: (member: string) =>
		set((state) => ({ members: state.members.filter((m) => m !== member) })),
	setMembers: (members: string[]) => set({ members }),
}));
