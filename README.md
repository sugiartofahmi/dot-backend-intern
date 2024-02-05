# Description

Patern project yang biasa saya gunakan adalah Repository. Repository pattern adalah suatu pendekatan untuk memisahkan business logic dengan persistence logic sehingga dapat mengurangi kompleksitas dan meningkatkan usabilitas.

Kenapa menggunakan patern project tersebut ?

- Karena business logic dengan persistence logic, sehingga memudahkan dalam pengembangan aplikasi, testing, debuging maupun improvement
- Menghasilkan code yang lebih terstruktur dan terorganisir, sehingga mudah untuk dipahami, diubah, dan diperbarui.
- Memungkinkan melakukan pengujian yang lebih mudah dan terisolasi, sehingga dapat menemukan dan memperbaiki bug dengan lebih cepat.

## API Documentation

https://documenter.getpostman.com/view/28846904/2s9YyvCLk1

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
