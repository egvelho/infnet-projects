import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AuthToken } from "../authToken";
import type { Message } from "../types";

export async function listenMessengerNotifications(
  onMessage: (message: Message) => void
) {
  const token = AuthToken.get();
  await fetchEventSource(
    `${process.env.REACT_APP_API_URL}/messages/sse/notifications`,
    {
      onmessage(data) {
        if (data && data.data) {
          const message = JSON.parse(data.data);
          onMessage(message);
        }
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
