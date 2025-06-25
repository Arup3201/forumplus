import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserUpdateModal = ({ label, value, onSave, onCancel }: { label: string, value: string, onSave: (value: string) => void, onCancel: () => void }) => {
    const [tempValue, setTempValue] = useState(value);

    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User Profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Label>{label}</Label>
                    <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(tempValue)}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserUpdateModal;