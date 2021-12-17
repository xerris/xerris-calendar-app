import { useAuth } from '@xerris/utility-app'

export default function Root(props) {
  const authToken = useAuth()

  if(!authToken) {
    window.location.replace("/")
    return
  }

  return <section>{props.name} is mounted!</section>;
}
