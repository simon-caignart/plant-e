import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/addFCMTokenToUser
export default async function handle(req, res) {
  const { fcmToken } = req.body;

  const session = await getSession({ req });

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      fcmToken: fcmToken,
    },
  });

  res.json({
    message: "FCM Token added to user",
  });
}
