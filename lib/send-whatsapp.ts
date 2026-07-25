// lib/send-whatsapp.ts

export async function sendWhatsApp(phone: string, message: string) {
  const token = process.env.FONNTE_TOKEN;

  if (!token) {
    throw new Error("FONNTE_TOKEN belum tersedia");
  }

  const formattedPhone = phone.startsWith("0") ? "62" + phone.slice(1) : phone;

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

  console.log("FONNTE RESPONSE:", result);

  if (!response.ok) {
    throw new Error(result.reason || "Gagal kirim WhatsApp");
  }

  return result;
}
