import Lottie from 'lottie-react'
import animation from '../assets/animation/empty_state.json'
const EmptyState = ({firstMessage,secondMessage}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
          <Lottie animationData={animation} style={{width:"43%"}} loop={3} />
          <div className='text-center '>
          <p className='mb-1 fs-6'>{firstMessage}</p>
          <p className='text-muted m-0 fs-6 '>{secondMessage}</p>
          </div>
          
  </div>
  )
}

export default EmptyState