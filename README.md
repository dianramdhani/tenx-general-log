
# TenX General Log

## Overview
TenX General Log adalah proyek yang bertujuan untuk menyediakan solusi logging yang komprehensif dan terintegrasi dengan mudah dalam aplikasi modern. Proyek ini berfokus pada pembuatan sistem logging yang dapat diandalkan dan mudah dikelola.

## Features
- Logging berbasis database

## Technologies Used
- Node.js
- TypeScript
- MySQL
- Docker Compose
- Winston
- Date-fns

## Installation
1. Clone repository ini:

```bash
git clone https://github.com/dianramdhani/tenx-general-log.git
```

2. Install dependensi:

```bash
cd tenx-general-log
npm install
```

3. Buat file `.env` dengan isi seperti `.env.example`

4. Jalankan Docker compose untuk MySQL:

```bash
docker-compose up -d
```

## Usage

1. Jalankan mode development:

```bash
npm run start:dev
```

2. Jalankan mode production:

```bash
npm run start
```

## License

Proyek ini dilisensikan di bawah TenX Technology.
