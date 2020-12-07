import { useAppContext } from './store';

export default async function () {
  const { message } = useAppContext();

  console.log(message);

  console.log('this is service module');
  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
}
