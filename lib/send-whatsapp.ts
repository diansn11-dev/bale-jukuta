export async function sendWhatsApp(phone: string, message: string) {
  const token = process.env.FONNTE_TOKEN;

  if (!token) {
    throw new Error("FONNTE_TOKEN belum tersedia");
  }

  let formattedPhone = phone.replace(/\D/g, "");

  if (formattedPhone.startsWith("08")) {
    formattedPhone = "62" + formattedPhone.slice(1);
  }

  if (formattedPhone.startsWith("8")) {
    formattedPhone = "62" + formattedPhone;
  }

  console.log("KIRIM WHATSAPP KE:", formattedPhone);

  const response = await fetch("https://api.fonnte.com/send", {
    method: "POST",

    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      target: formattedPhone,
      message,
    }),
  });

  const result = await response.json();

  console.log("STATUS FONNTE:", response.status);
  console.log("FONNTE RESPONSE:", result);

  if (!response.ok || result.status === false) {
    throw new Error(result.reason || "Gagal kirim WhatsApp");
  }

  return result;
}
