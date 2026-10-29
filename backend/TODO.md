# TODO — Backend Bolha Store

## Fase 0: Base
- [x] 0.1 Remover o exemplo `weatherforecast` do `Program.cs`
- [x] 0.2 Configurar Controllers (`AddControllers` / `MapControllers`) e criar a pasta `Features/`
- [x] 0.3 `docker-compose.yml` com Postgres (volume, porta, usuário e senha)
- [x] 0.4 Inicializar o `dotnet user-secrets` e colocar a connection string nele
- [x] 0.5 Configurar o CORS para `http://localhost:5173`
- [x] 0.6 Habilitar Swagger/Scalar no dev e testar um endpoint de health

## Fase 1: Banco e catálogo
- [ ] 1.1 Instalar EF Core + Npgsql + Design, e a ferramenta `dotnet-ef`
- [ ] 1.2 Criar o `AppDbContext` e registrar no DI
- [ ] 1.3 Entidade `Product` (id, nome, categoria, preço, descrição, cor de fundo, tipo, peso e dimensões)
- [ ] 1.4 Modelar cores e tamanhos (tabelas próprias ou colunas JSON/array)
- [ ] 1.5 Seed com os 10 produtos do `products.ts`
- [ ] 1.6 Primeira migration e `database update`
- [ ] 1.7 `IProductRepository` e `ProductRepository`
- [ ] 1.8 `IProductService` e `ProductService` + DTOs de resposta
- [ ] 1.9 `ProductsController`: `GET /products`, `GET /products?cat=`, `GET /products/{id}` (404 quando não existe)
- [ ] 1.10 **Front:** Home, Shop e ProductPage buscando da API

## Fase 2: Autenticação
- [ ] 2.1 Entidade `User` (nome, e-mail único, hash da senha, `Role`, telefone, CPF) + migration
- [ ] 2.2 `IUserRepository` e `UserRepository`
- [ ] 2.3 `IAuthService`: cadastro com `PasswordHasher<User>` e login verificando o hash
- [ ] 2.4 `ITokenService`: gerar o JWT (claims `sub`, `email`, `role` e expiração)
- [ ] 2.5 Chave do JWT, issuer e audience no user-secrets
- [ ] 2.6 Configurar `AddAuthentication().AddJwtBearer(...)` e `AddAuthorization()`
- [ ] 2.7 `AuthController`: `POST /auth/register`, `POST /auth/login` (409 se o e-mail já existe, 401 se a senha está errada)
- [ ] 2.8 `GET /me` com `[Authorize]`, lendo o id do usuário pelas claims
- [ ] 2.9 Seed do Admin: promover o e-mail configurado para `Role = Admin`
- [ ] 2.10 Testar no Postman sem token (401), com token (200) e com role errada (403)
- [ ] 2.11 **Front:** tela de Login real, guardar o token e mandar `Authorization: Bearer`

## Fase 3: Pedidos (sem pagamento)
- [ ] 3.1 Criar conta no **Melhor Envio sandbox** e gerar o token (user-secrets), com o CEP de origem na config
- [ ] 3.2 `IShippingService`: cotação (`POST /me/shipment/calculate`) com o CEP e os itens do pedido
- [ ] 3.3 `ShippingController`: `POST /shipping/quote` → opções (serviço, preço, prazo)
- [ ] 3.4 Entidade `Coupon` (`Code`, `PercentOff`, `ExpiresAt`, `Active`) + seed de um cupom + migration
- [ ] 3.5 `GET /coupons/{code}` (válido ou inválido + percentual)
- [ ] 3.6 Regras de preço: subtotal → desconto (só produtos) → frete grátis acima de R$ 299 (depois do desconto, só na opção mais barata)
- [ ] 3.7 **Testes xUnit** das regras de preço, cupom e frete grátis
- [ ] 3.8 Entidades `Order` e `OrderItem` (preço, cor e tamanho **copiados**; endereço; serviço de frete, preço e prazo; desconto; total; `Status` como string) + migration
- [ ] 3.9 `IOrderRepository` / `IOrderService`
- [ ] 3.10 `POST /orders` `[Authorize]`: valida os itens, busca os preços no banco, **recota o frete** pelo `serviceId`, aplica o cupom e salva em `AwaitingPayment`
- [ ] 3.11 `GET /orders` e `GET /orders/{id}`, só do próprio usuário (404 para pedido de outro usuário)
- [ ] 3.12 **Front:** cotação no Checkout (substituir padrão/expresso), cupom e criação do pedido

## Fase 4: Pagamentos (Mercado Pago) ⭐
- [ ] 4.1 Criar a aplicação no MP, as **contas de teste** (vendedor e comprador) e pegar as credenciais de teste
- [ ] 4.2 Access token e segredo do webhook no user-secrets; instalar o SDK `mercadopago-sdk`
- [ ] 4.3 Entidade `Payment` (`OrderId`, `MercadoPagoId`, `Method`, `Status`, valor, dados do Pix/boleto, datas) + migration
- [ ] 4.4 `IPaymentGateway`: wrapper do SDK (criar, consultar e cancelar pagamento), com idempotency key
- [ ] 4.5 `IPaymentService`: regra das tentativas (recusar se já existe `approved`, cancelar as `pending` anteriores)
- [ ] 4.6 **Pix:** `POST /orders/{id}/payments` com método pix → expira em 30 min → devolve o QR code e o código copia-e-cola
- [ ] 4.7 Configurar o **Dev Tunnels** e cadastrar a URL do webhook no painel do MP
- [ ] 4.8 `WebhooksController`: `POST /webhooks/mercadopago` sem `[Authorize]`
- [ ] 4.9 Validar o `x-signature` (HMAC); se for inválido, devolver 401
- [ ] 4.10 Consultar o pagamento no MP pelo id → atualizar o `Payment` → se `approved`, o pedido vai para `Preparing`
- [ ] 4.11 Webhook idempotente: a mesma notificação chegando 2x não quebra nada
- [ ] 4.12 **Teste unitário** da validação de assinatura
- [ ] 4.13 Testar o Pix ponta a ponta no sandbox (aprovado e expirado)
- [ ] 4.14 **Cartão:** `POST /orders/{id}/payments` com token, `payment_method_id`, `installments` (até 6x) e e-mail do pagador
- [ ] 4.15 Testar os cartões de teste: aprovado, recusado e pendente
- [ ] 4.16 **Boleto:** criar o pagamento e devolver o link
- [ ] 4.17 **Front:** Card Payment Brick no Checkout, QR do Pix e link do boleto no OrderDone, consulta do status do pagamento

## Fase 5: Status e rastreio
- [ ] 5.1 Regra de transições válidas (`Preparing → Shipped → InTransit → Delivered`) + **testes xUnit**
- [ ] 5.2 Campos de transportadora e código de rastreio no `Order` (ou entidade `Shipment`) + migration
- [ ] 5.3 `PATCH /admin/orders/{id}/ship` com `[Authorize(Roles = "Admin")]`
- [ ] 5.4 `ApiKeyAuthenticationHandler` (esquema `"ApiKey"`, header `X-Api-Key`, chave no user-secrets)
- [ ] 5.5 `PATCH /carrier/shipments/{trackingCode}` com `[Authorize(AuthenticationSchemes = "ApiKey")]` → `InTransit` / `Delivered`
- [ ] 5.6 Testar no Postman: sem chave (401), com chave errada (401) e com a chave certa
- [ ] 5.7 **Front:** Conta (lista de pedidos) e TrackOrder com dados reais

## Fase 6: Extras e qualidade
- [ ] 6.1 `PUT /me` (Meus dados)
- [ ] 6.2 Favoritos: `GET`, `POST` e `DELETE /me/favorites`
- [ ] 6.3 Endereços: CRUD `/me/addresses`
- [ ] 6.4 Validação de entrada (e-mail, CEP, quantidade > 0, CPF)
- [ ] 6.5 Respostas de erro padronizadas (`ProblemDetails`) + tratamento global de exceções
- [ ] 6.6 **Teste de integração** do webhook (WebApplicationFactory + Testcontainers Postgres + `IPaymentGateway` falso)

## Fase 7: Deploy
- [ ] 7.1 Escolher hosts gratuitos (front, API e banco)
- [ ] 7.2 `Dockerfile` da API
- [ ] 7.3 Banco de produção + migrations
- [ ] 7.4 Segredos como variáveis de ambiente no host (e GitHub Secrets, se usar Actions)
- [ ] 7.5 Trocar a URL do webhook do MP para a de produção

## Talvez depois
- [ ] Estorno automático de pagamento duplicado
- [ ] Reembolso (`POST /orders/{id}/refund`)
- [ ] Melhor Envio real: etiqueta e webhook assinado da transportadora
- [ ] Controle de estoque com reserva durante o Pix pendente
- [ ] Refresh token
