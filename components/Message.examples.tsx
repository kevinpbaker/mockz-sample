import * as C from './Message';

export const Message = {
  Customer: (
    <C.Message
      author="Maya Ferreira"
      time="9:41 AM"
      body="My order came today. The speckled mug has a small chip on the rim. The rest of the set is perfect. Can you send a new mug?"
      attachment="chip-on-rim.jpg · 1.2 MB"
    />
  ),
  Team: <C.Message author="Sam Okoro" time="10:02 AM" from="team" body="Sorry about that, Maya. A new speckled mug ships today." />,
  Note: <C.Message author="Lena Park" time="9:55 AM" from="note" body="We have 6 speckled mugs in stock. Send one today, no return needed." />
};
