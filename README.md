# EESO CAKE PROJECT

![portfolio_eesocake](https://github.com/jinbokk/eeso-cake-app/assets/101123079/f35b5fbd-da7d-49a6-8f17-68f812e7e6d6)

A website for custom cake workshop

I developed a website to make it easier and faster for people to order cakes and get advice. 

Before, they had to use KakaoTalk for this. I also made the website a place where people can see different categories of cake photos that have been sold before. 

My goal in developing this project was to boost sales through this platform.

## Authors

- [@jinbokk](https://www.github.com/jinbokk)


## Tech Stack

**Client:** React, Redux, Redux-Thunk

**Server:** Node, Express, Nginx, PM2

**Database:** MongoDB, Mongoose

**Deployment:** AWS EC2, AWS Route53, Github Actions

**Others:** Iamport (currently 'Portone', payment service), Cloundinary (Image Hosting service)
## Acknowledgements

- ***Inflearn***
    - [React + API Server 프로젝트 개발과 배포 (CI/CD) / Kenu 허광남](https://www.inflearn.com/course/%EB%A6%AC%EC%95%A1%ED%8A%B8-api-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)
    - [따라하며 배우는 노드, 리액트 시리즈 - 쇼핑몰 사이트 만들기 / John Ahn ](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%87%BC%ED%95%91%EB%AA%B0)
    - [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의 / John Ahn ](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8)

- ***Youtube***
    - [Full Stack Web Development Course / Web Dev Simplified](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM)
    - [Understanding File Uploads in Node.js using Multer - Web Development Concepts Explained / The Full Stack Junkie](https://www.youtube.com/watch?v=EVOFt8Its6I&list=WL&index=12)
    - [Uploading an Image using Node.js and Retrive Image in React | Multer | Mongo db / Sahul Hameed ](https://www.youtube.com/watch?v=NzROCbkvIE0&list=WL&index=14)

- ***Stackoverflow***
    - [Is there a way to update and push at the same time conditionally in Mongodb? / Jinbok Lee](https://stackoverflow.com/questions/75029709/is-there-a-way-to-update-and-push-at-the-same-time-conditionally-in-mongodb)
    - [Is there a way to update environment variables automatically in AWS EC2? / Jinbok Lee](https://stackoverflow.com/questions/75393809/is-there-a-way-to-update-environment-variables-automatically-in-aws-ec2)





## Design Reference

| Website             | Link                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Turtlehip | https://turtlehip.com |
| Joocake | https://joocake.com |
| The Cake Bake Shop | https://thecakebakeshop.com |


## Lessons Learned

I have learned the following during this project:

* How to develop in a monorepo environment

* How to deploy and manage applications in a cloud environment using AWS services.

* How to implement CI/CD (Continuous Integration/Continuous Deployment) using GitHub Actions.

* How to establish a contract with a payment gateway provider and implement actual payments instead of test payments.

* How to manage page routing based on user permissions using the Higher Order Component (HOC) approach.


## Feedback

* It should be implemented to allow ordering directly without requiring member login, including non-members.

* The website layout changes or overlaps inconveniently depending on the device being used

* Please add a feature to conveniently sign up using SNS account integration.

* The menu is in English, making it difficult to read. Please translate it into Korean or make it available in Korean.


    **If you have any feedback, please reach out to me at eyelash1024@naver.com**

    **or provide feedback through Google Forms : https://forms.gle/ekiKLqCg23NpdtzT6**


## Roadmap

- Additional browser support

- Enable ordering for non-logged-in users

- Add more integrations
    - SNS account integration
    - Channel talk

- Optimization for smoother and faster operation

