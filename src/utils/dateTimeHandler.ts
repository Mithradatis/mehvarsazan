export function getPersianDate(dateTimeString: string): string {
    const options: any = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'persian',
        locale: 'fa-IR'
    };

    const formatter = new Intl.DateTimeFormat('fa-IR', options);
    const newDate = formatter.format(new Date(dateTimeString))

    return newDate;
}


