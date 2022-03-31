export const DateService = {
    addHours(startTime: string, hours: number): string {
        let [hour, minute] = startTime.split(':').map(Number);
        hour = Math.min(hours + hour, 23);
        const newHour = hour.toString().padStart(2, '0'),
            minutes = minute.toString().padStart(2, '0');

        return `${newHour}:${minutes}`;
    },

    minAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    },
    maxAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 100);
        return date;
    },
    transformDate(value: any, originalValue: any): any {
        if (typeof originalValue === 'string') {
            const [dia, mes, ano] = originalValue.split('/');
            if (+mes < 1 || +mes > 12) {
                return new Date('');
            }
            return new Date(+ano, +mes - 1, +dia);
        }
        return value;
    },
};
