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
