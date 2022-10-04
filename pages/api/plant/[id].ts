import prisma from "../../../lib/prisma";

// DELETE /api/plant/:id
export default async function handle(req, res) {
  const plantId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.plant.delete({
      where: { id: plantId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
