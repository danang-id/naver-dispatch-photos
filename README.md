# Naver Dispatch Photos (NDP)

Downloads Naver X Dispatch HD Photos by Using CID

## List of Contents
- [Naver Dispatch Photos (NDP)](#naver-dispatch-photos-ndp)
  - [List of Contents](#list-of-contents)
  - [How to Use?](#how-to-use)
  - [How to Get CID?](#how-to-get-cid)
  - [Contribution](#contribution)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## How to Use?

First, clone this repository. This assumes you have [Git](https://git-scm.com/) installed on your system.

```bash
git clone https://github.com/danang-id/naver-dispatch-photos.git
```

Then, install dependencies and start the application. This assumes you have [NodeJS](https://nodejs.org) installed on your system.

```bash
cd naver-dispatch-photos
npm install
npm start
```

## How to get CID?

CID stands for Content Identification, a unique number used by Naver to identify a group of contents. You can get CID from Naver Photo Issue URL with format `(https://entertain.naver.com/photo/issue/<CID>/100`.

Example: If you have URL [https://entertain.naver.com/photo/issue/1047156/100](https://entertain.naver.com/photo/issue/1047156/100) (this leads to Naver X Dispatch HD Photos of GFriend), the number `1047156` is the CID.

## Contribution

To contribute, simply fork this project, and issue a pull request.

## Versioning

This project is using [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/danang-id/pknstan-sikipli-apis/tags).

## Authors

- **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

See also the list of [contributors](https://github.com/danang-id/pknstan-sikipli-apis/contributors) who participated in this project.

## License

This project is licensed under the Apache License version 2.0 (Apache-2.0). See [LICENSE](LICENSE) for details.
