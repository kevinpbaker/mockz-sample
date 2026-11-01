import * as C from './TextField';

export const TextField = {
  Empty: <C.TextField label="To" placeholder="name@example.com" />,
  Filled: <C.TextField label="Subject" defaultValue="Your class on the 14th" />,
  Error: <C.TextField label="To" defaultValue="theo.lindqvist" error="Enter an email address, such as name@example.com." />,
  Multiline: <C.TextField label="Message" placeholder="Write your message" multiline={true} />
};
