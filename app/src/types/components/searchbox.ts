import type { ChangeEventHandler } from "react";

interface SeachboxProps {
    size: number, 
    placeholder?: string,
    className?: string,
    onChange?: ChangeEventHandler
}

export type { SeachboxProps };