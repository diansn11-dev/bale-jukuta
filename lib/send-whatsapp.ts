export async function sendWhatsApp(phone: string, message: string) {
  const formattedPhone = phone.startsWith("0") ? "62" + phone.slice(1) : phone;

  console.log("TOKEN:", process.env.FONNTE_TOKEN);
  console.log("TARGET:", formattedPhone);

  const response = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      Authorization: process.env.FONNTE_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target: formattedPhone,
      message,
    }),
  });

  const result = await response.json();

  console.log("STATUS HTTP:", response.status);
  console.log("FONNTE RESPONSE:", result);

  return result;
}
