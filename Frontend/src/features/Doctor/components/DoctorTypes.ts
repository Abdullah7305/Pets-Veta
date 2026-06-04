export type WeekDay =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export type TimeSlot = {
    id: string;
    date: string;
    day: WeekDay;
    label: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
};

export type SlotForm = {
    date: string;
    day: WeekDay;
    startTime: string;
    endTime: string;
};

export const weekDays: { value: WeekDay; label: string }[] = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" },
];
