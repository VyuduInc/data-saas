import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash('test123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      settings: {
        theme: 'light',
        model: 'gpt-3.5-turbo',
        runtime: 'Python',
        alwaysShowCode: false,
        context: '',
        responseStyle: '',
        isPremium: false,
      },
    },
  });

  // Create test chat
  const chat = await prisma.chat.create({
    data: {
      title: 'Welcome Chat',
      userId: user.id,
      messages: {
        create: [
          {
            content: 'Hello! How can I help you analyze your data today?',
            role: 'assistant',
          },
          {
            content: 'I need help understanding my sales data.',
            role: 'user',
          },
          {
            content: "I'll help you analyze your sales data. Could you please share your data file or describe what specific aspects you'd like to understand?",
            role: 'assistant',
          },
        ],
      },
    },
  });

  console.log({ user, chat });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
