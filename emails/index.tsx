import { getAssets } from '@/lib/utils';
import { formValues } from '@/types/projects';
import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
  Heading,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export const Email = (formData: formValues) => {
  const { amount, currency, email, name, value } = formData;
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Preview>Investment request received</Preview>
        <Body style={main}>
          <Container>
            <Section>
              <Row>
                <Img width={620} src={getAssets('partners/nevateam.jpg')} />
              </Row>

              <Row>
                <Column>
                  <Heading as='h2' className='text-center'>
                    We received an investment request
                  </Heading>

                  <Text>
                    <b>Name: </b>
                    {name}
                  </Text>
                  <Text>
                    <b>Email: </b>
                    {email}
                  </Text>
                  <Text>
                    <b>Amount of units: </b>
                    {new Intl.NumberFormat('CH', {
                      maximumFractionDigits: 0,
                    }).format(Number(amount))}
                  </Text>
                  <Text>
                    <b>Amount willing to invest: </b>
                    {new Intl.NumberFormat('CH', {
                      style: 'currency',
                      currency: currency,
                      maximumFractionDigits: 0,
                    }).format(Number(value))}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column colSpan={2}>
                  <Link
                    className='px-4 py-2 bg-brand text-white rounded-md shadow cursor-pointer mb-4'
                    href={`mailto:${email}`}
                  >
                    Reply now
                  </Link>
                </Column>
              </Row>
            </Section>

            <Section className='flex justify-center items-center'>
              <Img width={300} src={getAssets('v2/poweredby.png')} />
            </Section>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'rgb(0,0,0, 0.7)',
              }}
            >
              Smat © 2024, Switzerland | All rights reserved
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

Email.PreviewProps = {
  email: 'lucas@smat.io',
  name: 'Lucas Verdiell',
  amount: '25000',
  value: '25000',
  currency: 'USD',
};

export default Email;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
