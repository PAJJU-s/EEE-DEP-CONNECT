import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'

const holidays = [
  { date: new Date(2024, 0, 26), name: "Republic Day" },
  { date: new Date(2024, 2, 8), name: "Holi" },
  { date: new Date(2024, 2, 29), name: "Good Friday" },
  { date: new Date(2024, 3, 14), name: "Ambedkar Jayanti" },
  { date: new Date(2024, 4, 1), name: "Labour Day" },
  { date: new Date(2024, 7, 15), name: "Independence Day" },
  { date: new Date(2024, 9, 2), name: "Gandhi Jayanti" },
  { date: new Date(2024, 9, 31), name: "Diwali" },
  { date: new Date(2024, 10, 1), name: "Diwali Holiday" },
  { date: new Date(2024, 11, 25), name: "Christmas" },
]

const importantDates = [
  { date: new Date(2024, 0, 15), name: "Semester Exams Begin", type: "exam" },
  { date: new Date(2024, 1, 1), name: "Project Submission Deadline", type: "deadline" },
  { date: new Date(2024, 2, 15), name: "Mid Semester Exams", type: "exam" },
  { date: new Date(2024, 4, 10), name: "Final Project Presentation", type: "event" },
  { date: new Date(2024, 5, 1), name: "Summer Vacation Begins", type: "holiday" },
]

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get first day of month to pad calendar
  const firstDayOfWeek = monthStart.getDay()
  const paddingDays = Array.from({ length: firstDayOfWeek }, (_, i) => i)

  const getHolidayForDate = (date) => {
    return holidays.find(h => isSameDay(h.date, date))
  }

  const getImportantDateForDate = (date) => {
    return importantDates.find(d => isSameDay(d.date, date))
  }

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  return (
    <div className="min-h-screen relative overflow-hidden py-8">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 electric-glow">
            Academic Calendar
          </h1>
          <p className="text-xl text-gray-300">Holidays and important dates</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-effect rounded-xl p-6"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-blue-900/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-blue-900/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Padding days */}
              {paddingDays.map(day => (
                <div key={`pad-${day}`} className="aspect-square"></div>
              ))}

              {/* Calendar days */}
              {daysInMonth.map(day => {
                const holiday = getHolidayForDate(day)
                const importantDate = getImportantDateForDate(day)
                const isToday = isSameDay(day, new Date())

                return (
                  <motion.div
                    key={day.toString()}
                    whileHover={{ scale: 1.1 }}
                    className={`aspect-square rounded-lg p-2 cursor-pointer transition-all ${
                      isToday
                        ? 'bg-electric-blue text-white ring-2 ring-circuit-gold'
                        : holiday
                        ? 'bg-circuit-gold/20 text-circuit-gold border-2 border-circuit-gold'
                        : importantDate
                        ? 'bg-voltage-purple/20 text-voltage-purple border-2 border-voltage-purple'
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {format(day, 'd')}
                    </div>
                    {holiday && (
                      <div className="text-xs truncate" title={holiday.name}>
                        🎉 {holiday.name}
                      </div>
                    )}
                    {importantDate && !holiday && (
                      <div className="text-xs truncate" title={importantDate.name}>
                        {importantDate.type === 'exam' && '📝'}
                        {importantDate.type === 'deadline' && '⏰'}
                        {importantDate.type === 'event' && '🎯'}
                        {importantDate.type === 'holiday' && '🏖️'}
                        <span className="ml-1">{importantDate.name}</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Holidays List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center text-circuit-gold">
                <CalendarIcon className="w-6 h-6 mr-2" />
                Upcoming Holidays
              </h3>
              <div className="space-y-3">
                {holidays
                  .filter(h => h.date >= new Date())
                  .slice(0, 5)
                  .map((holiday, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-circuit-gold/20 flex items-center justify-center text-circuit-gold font-bold text-sm">
                        {format(holiday.date, 'd')}
                      </div>
                      <div>
                        <p className="font-semibold">{holiday.name}</p>
                        <p className="text-sm text-gray-400">{format(holiday.date, 'MMM yyyy')}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Important Dates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-electric-blue">Important Dates</h3>
              <div className="space-y-3">
                {importantDates
                  .filter(d => d.date >= new Date())
                  .slice(0, 5)
                  .map((date, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                        date.type === 'exam' ? 'bg-current-orange/20 text-current-orange' :
                        date.type === 'deadline' ? 'bg-voltage-purple/20 text-voltage-purple' :
                        date.type === 'event' ? 'bg-power-green/20 text-power-green' :
                        'bg-circuit-gold/20 text-circuit-gold'
                      }`}>
                        {format(date.date, 'd')}
                      </div>
                      <div>
                        <p className="font-semibold">{date.name}</p>
                        <p className="text-sm text-gray-400">{format(date.date, 'MMM yyyy')}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar

