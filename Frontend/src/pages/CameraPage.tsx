import { useNavigate } from 'react-router-dom'
import CameraInterface from '../components/CameraInterface'

export default function CameraPage() {
  const navigate = useNavigate()
  return <CameraInterface onBack={() => navigate('/home')} />
}
