# Infra

## Sem IaC

### Rede e Segurança
- [ ] Criar VPC, sub-redes e roteadores manualmente
- [ ] Criar Security Groups:
  - [ ] Liberar HTTPS (443)
  - [ ] Restringir Redis e RDS a rede interna

### Serviços AWS
- [ ] Criar bucket S3 via Console ou CLI:
  - [ ] Ativar versionamento
  - [ ] Definir política pública restrita ou configurar OAI/OAC
- [ ] Criar distribuição CloudFront:
  - [ ] Linkar ao bucket S3
  - [ ] Configurar TTL e comportamento de cache
- [ ] Criar instância Redis (ElastiCache)
- [ ] Criar banco de dados (RDS):
  - [ ] Backup habilitado
  - [ ] Multi-AZ se for produção

### Deploy & Containers
- [ ] Criar imagem Docker localmente
- [ ] Criar repositório no ECR
- [ ] Fazer push com `docker` + `aws ecr` CLI
- [ ] Criar cluster ECS ou instância EC2
- [ ] Fazer deploy manual da imagem/container

### Secrets e Variáveis
- [ ] Criar segredos no Secrets Manager
- [ ] Configurar leitura de secrets no backend manualmente

### Observabilidade
- [ ] Ativar logs no CloudWatch
- [ ] Criar dashboards manuais
- [ ] Configurar alarmes (ex: erros, latência, uso de CPU)

### CI/CD
- [ ] Configurar pipeline (ex: GitHub Actions, GitLab CI)
  - [ ] Buildar imagem
  - [ ] Push no ECR
  - [ ] Deploy com script shell ou CLI AWS

---

## Com Pulumi (Infra as Code)

### Rede e Segurança
- [ ] Criar VPC com sub-redes públicas e privadas
- [ ] Criar grupos de segurança:
  - [ ] Permitir HTTPS (443) para frontend/backend
  - [ ] Permitir acesso interno ao Redis e ao banco de dados
- [ ] Criar roles IAM para:
  - [ ] Backend acessar S3
  - [ ] Pipeline de CI/CD com permissões limitadas

### Serviços AWS
- [ ] Criar bucket S3 com:
  - [ ] Versionamento habilitado
  - [ ] Acesso controlado via OAI/OAC (CloudFront)
- [ ] Criar distribuição CloudFront:
  - [ ] Configurar origem como S3
  - [ ] TTL e headers de cache
  - [ ] Bloquear acesso direto ao S3
- [ ] Criar Redis (ElastiCache)
- [ ] Criar banco de dados (RDS PostgreSQL/MySQL):
  - [ ] Backup automático
  - [ ] Multi-AZ (produção)

### Deploy & Containers
- [ ] Criar repositório no ECR
- [ ] Criar cluster ECS/EKS (ou Fargate)
- [ ] Definir tasks/serviços para o backend
- [ ] Configurar Load Balancer (ALB) com HTTPS

### Secrets e Variáveis
- [ ] Criar segredos no Secrets Manager
- [ ] Injetar secrets no container via variáveis de ambiente

### Observabilidade
- [ ] Enviar logs dos containers para CloudWatch
- [ ] Monitorar:
  - [ ] CPU
  - [ ] Memória
  - [ ] Latência
- [ ] Criar alarmes (erros, uso excessivo etc.)

### CI/CD
- [ ] Configurar pipeline (ex: GitHub Actions)
- [ ] A pipeline deve:
  - [ ] Buildar a imagem Docker
  - [ ] Fazer push no ECR
  - [ ] Rodar `pulumi up` para atualizar a infra