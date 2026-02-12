## 🏛️ Estrutura do Projeto

```
backend/
  src/
    domain/
      entities/
        User.ts
        Task.ts
      value-objects/
      errors/
      repositories/
        UserRepository.ts
        TaskRepository.ts

    application/
      use-cases/
        auth/
          RegisterUser.ts
          LoginUser.ts
        tasks/
          CreateTask.ts
          ListTasks.ts
          UpdateTask.ts
          DeleteTask.ts
      dtos/
      ports/
        CryptoProvider.ts
        TokenProvider.ts

    infrastructure/
      db/
        prisma/ (ou knex/typeorm)
        repositories/
          PrismaUserRepository.ts
          PrismaTaskRepository.ts
      providers/
        BcryptCryptoProvider.ts
        JwtTokenProvider.ts

    interfaces/
      http/
        controllers/
        routes/
        middlewares/
          authGuard.ts
          roleGuard.ts
          errorHandler.ts
        validators/
      docs/
        openapi.yaml (opcional)

    config/
      env.ts
      logger.ts

    main/
      server.ts
      app.ts

  tests/
    unit/
    integration/


```