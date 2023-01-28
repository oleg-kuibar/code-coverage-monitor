'use client';

import React from "react";
import KanbanBoard from "ui/kanban/kanban-board";

export default function BoardLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <KanbanBoard>
            {children}
        </KanbanBoard>
    );
}