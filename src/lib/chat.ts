export function getSmartReply(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('musanze') || lower.includes('kigali to')) {
    return "Found 4 buses today! Earliest: Volcano Express 06:00 at 3,500 RWF. Shall I open search for you? 🔍";
  }
  if (lower.includes('cheap') || lower.includes('lowest')) {
    return "Cheapest today: RITCO Kigali→Musanze at 3,200 RWF, departing 07:30. Want me to select it? 💰";
  }
  if (lower.includes('next') || lower.includes('departure') || lower.includes('soon')) {
    return "Next bus in ~12 min: Volcano Express 06:00 → Musanze. Only 18 seats left! Book fast 🚨";
  }
  if (lower.includes('help') || lower.includes('book')) {
    return "Let's get you booked! Where are you going? Type your destination or tap a popular route below. 🎫";
  }
  if (lower.includes('muraho') || lower.includes('hello') || lower.includes('hi')) {
    return "Muraho! Nitwa Rugendo 🚌 I'm here to help you travel Rwanda easily. Where to today?";
  }
  if (lower.includes('rubavu')) {
    return "Kigali to Rubavu: 4 buses available today, starting at 4,000 RWF. Journey takes ~3 hours. Want to see departures? 🏖️";
  }
  if (lower.includes('huye')) {
    return "Kigali to Huye: Multiple buses from 2,500 RWF, about 2h 15m journey. First departure at 06:30! 📚";
  }
  if (lower.includes('price') || lower.includes('cost')) {
    return "Bus prices in Rwanda range from 1,200 RWF (Rwamagana) to 4,000 RWF (Rubavu). Which route interests you? 💵";
  }
  if (lower.includes('mtn') || lower.includes('momo') || lower.includes('payment') || lower.includes('pay')) {
    return "We accept MTN Mobile Money and Airtel Money! Just select your preferred method at checkout. 🔐";
  }
  return "Checking that for you... 🔍 Try searching from the home screen, or ask me about routes, prices, or booking tips!";
}
