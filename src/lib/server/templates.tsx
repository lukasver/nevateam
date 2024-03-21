import { formValues } from '@/types/projects';
import { Button, Tailwind } from '@react-email/components';

export const Email = (data: formValues) => {
  return (
    <Tailwind>
      <p>New submission request:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${data.email}`}>{data.email}</a>
        </li>
        <li>Name: {data.name}</li>
        <li>Quantity: {data.amount}</li>
        <li>
          Amount: {data.value} ${data.currency}
        </li>
      </ul>
    </Tailwind>
  );
};
