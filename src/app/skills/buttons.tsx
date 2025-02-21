'use client';

import { addSkill, removeSkill } from './actions';
import { Plus, Trash2 } from 'lucide-react';

interface DeleteProps {
  id: number;
}

const createOnClick = () => {
  addSkill();
};

const deleteOnClick = (skillId: number) => {
  removeSkill(skillId);
};

export function CreateButton() {
  return (
    <button className="" onClick={createOnClick}>
      <Plus className="bg-sky-700 hover:bg-sky-500 rounded-full w-12 " />
    </button>
  );
}

export function DeleteButton({ id }: DeleteProps) {
  return (
    <button onClick={() => deleteOnClick(id)}>
      <Trash2 className="bg-sky-700 hover:bg-sky-500 rounded-full w-12" />
    </button>
  );
}
