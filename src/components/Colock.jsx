import { useEffect, useState } from 'react'

const getParsedTime = (date) => {
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return { day, hour, minute }
}

const twoDigitString = (number) => {
  if (number < 10) { return `0${number}`}
  return `${number}`
}

const Clock = () => {
  // 이거 전체를 useTimer로 빼자
  const [date, setDate] = useState(new Date())
  const { day, hour, minute } = getParsedTime(date)

  useEffect(
    () => {
      const intervalId = setInterval(
        () => setDate(new Date),
        1 * 60 * 1000
      )

      return () => clearInterval(intervalId)
    },
    []
  )

  return (
    <div className='clock'>
      <div>{day}일</div>
      <div>{twoDigitString(hour)}:{twoDigitString(minute)}</div>
    </div>
  )
}

export default Clock