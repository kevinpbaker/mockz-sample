import * as C from './ConversationRow';

export const ConversationRow = {
  Unread: (
    <C.ConversationRow
      name="Maya Ferreira"
      subject="Order #4821 arrived with a chipped rim"
      preview="The speckled mug has a small chip on the rim. Can you send a new one?"
      time="9:41 AM"
      status="new"
      tag="Orders"
      unread={true}
    />
  ),
  Read: (
    <C.ConversationRow
      name="Priya Raman"
      subject="Wholesale price for 40 bowls"
      preview="We open a café in March and we like your Fog glaze a lot."
      time="Yesterday"
      status="open"
      tag="Wholesale"
    />
  ),
  Selected: (
    <C.ConversationRow
      name="Maya Ferreira"
      subject="Order #4821 arrived with a chipped rim"
      preview="The speckled mug has a small chip on the rim. Can you send a new one?"
      time="9:41 AM"
      status="open"
      tag="Orders"
      selected={true}
    />
  ),
  Compact: (
    <C.ConversationRow
      name="Theo Lindqvist"
      subject="Move my Saturday wheel class"
      preview="I cannot come to the 10:00 class on the 14th. Is there space at 14:00?"
      time="9:12 AM"
      status="new"
      unread={true}
      compact={true}
    />
  ),
  Resolved: (
    <C.ConversationRow
      name="Sofia Marchetti"
      subject="Thank you for the glaze workshop"
      preview="We had a great time on Saturday. When is the next one?"
      time="Mon"
      status="resolved"
    />
  )
};
