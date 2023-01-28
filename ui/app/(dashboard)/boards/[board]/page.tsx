import KanbanColumn from "../../../../../ui/kanban/kanban-column";
import {IKanbanColumn} from "../../../../../ui/kanban/kanban.interface";
import {KanbanCardPriorityEnum, KanbanColumnTypeEnum} from "../../../../../ui/kanban/kanban.enum";
import KanbanCard from "../../../../../ui/kanban/kanban-card";

export default function BoardPage() {
    // KanbanColumnTypeEnum is an enum that is defined in ui/kanban/kanban-column.tsx
    const FakeKanbanColumns: IKanbanColumn[] = [
        {
            id: "column-1",
            title: "Column",
            type: KanbanColumnTypeEnum.IDEA,
            cards: [
                {
                    id: '1',
                    updatedAt: '2020-01-01',
                    priority: KanbanCardPriorityEnum.LOW,
                    title: 'Card 1',
                    links: ['https://www.google.com'],
                    tags: ['tag1', 'tag2'],
                    assignees: ['user1', 'user2'],
                    comments: ['comment1', 'comment2'],
                    createdAt: '2020-01-01',
                    description: 'Description',
                },
                {
                    id: '2',
                    updatedAt: '2020-01-01',
                    priority: KanbanCardPriorityEnum.LOW,
                    title: 'Card 2',
                    links: ['https://www.google.com'],
                    tags: ['tag1', 'tag2'],
                    assignees: ['user1', 'user2'],
                    comments: ['comment1', 'comment2'],
                    createdAt: '2020-01-01',
                    description: 'Description',
                }
            ],
        },
        {
            id: "column-2",
            title: "Column",
            type: KanbanColumnTypeEnum.TODO,
            cards: [],
        },
        {
            id: "column-3",
            title: "Column",
            type: KanbanColumnTypeEnum.IN_PROGRESS,
            cards: [],
        },
        {
            id: "column-4",
            title: "Column",
            type: KanbanColumnTypeEnum.DONE,
            cards: [],
        }
    ];

    return (
        FakeKanbanColumns.map((column) => {
                return (
                    <KanbanColumn column={column}>
                        {column?.cards?.map((card) => {
                            return (
                                <KanbanCard card={card}/>
                            )
                        })}
                    </KanbanColumn>
                )
            }
        ));
}