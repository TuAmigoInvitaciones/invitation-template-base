export class Formatter {

    public static formatLocalDate(dateStr: string): string {
        if (!dateStr) return ''
        const [year, month, day] = dateStr.split('-').map(Number)
        const dateObj = new Date(year, month - 1, day)

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }
        const formatted = dateObj.toLocaleDateString('es-ES', options)
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }

}