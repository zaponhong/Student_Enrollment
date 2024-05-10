

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: null,
            programs: null,
            courses: [],
        };
    },
    mounted() {
        this.fetchInfoUser();
    },
    methods: {
        getUserImageURL(user) {
            if (user.image) {
                const imageUrl = `http://localhost:8000/storage/${user.image}`;
                return imageUrl;
            } else {
                const imageAuto =
                    'https://cdn-icons-png.flaticon.com/512/219/219970.png';
                return imageAuto;
            }
        },
        goToEditProfile() {
            this.$router.push({ name: 'studentEditProfile', params: { userId: user.student_id } });
        },

        logout() {
            axios.post('http://localhost:8000/api/logout')
                .then(response => {
                    console.log(response.data);
                    this.$store.commit('setUser', null)
                    this.$store.commit('setToken', null)
                    this.$store.commit('setRole', null)
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error)
                });
        },

        fetchInfoUser() {
            const userId = this.$route.params.userId;
            console.log('User ID:', userId); // Check the student_id

            axios.get(`http://localhost:8000/api/student/info/${userId}`)
                .then(response3 => {
                    this.user = response3.data[0];
                    this.programs = response3.data[0];
                    this.courses = response3.data[0];
                    console.log(response3.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });


        },



    },
};
</script>

<template>
    <div class="h-100" v-if="user">


        <div class="dashboard_ContainerFluid">
            <div class="row flex-nowrap">
                <div class=" col-md-3 col-xl-2 px-sm-2 min-vh-100 " style=" background-color: #233673;">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-23text-white">

                        <router-link to="/student/dashboard" class="text-decoration-none">
                            <div
                                class="d-flex align-items-center pb-3 mt-2 mb-md-0 me-md-auto text-white text-decoration-none">
                                <div class="d-flex text-center align-items-center m-auto justify-content-center mx-5">
                                    <img src="../../../assets/img/GS_logo.png" alt="" class="img-fluid "
                                        style="width:6rem;">
                                    <img src="../../../assets/img/ITC_logo.png" alt="" class="img-fluid"
                                        style="width:6rem;">
                                </div>
                            </div>
                        </router-link>


                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none"> <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bxs-dashboard bx-rotate-180 fs-5' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">Course</span>
                                    </a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentMyCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none"> <a href="#" class="nav-link align-middle px-0">
                                        <i class='mx-2 bx bx-book-open fs-4' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">My
                                            Course</span>
                                    </a>
                                </router-link>
                            </li>

                            <!-- <li class="nav-item mx-4">
                        <router-link to="'/draftCourse'" class="text-decoration-none">
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class='mx-2 bx bxs-book-content fs-5' style='color:white'></i>
                                <span class="ms-1 d-none d-sm-inline text-white fs-5">Draft
                                    Course</span></a>
                        </router-link>
                    </li> -->

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentGrade', params: { userId: user.student_id } }"
                                    class="text-decoration-none"> <a href="#" class="nav-link px-0 align-middle">
                                        <i class='mx-2 bx bx-line-chart-down fs-5' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">Grade</span></a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4">
                                <router-link :to="{ name: 'studentDocument', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <i class='mx-2 bx bxs-file-doc fs-5' style='color:white'></i>
                                        <span class="ms-1 d-none d-sm-inline text-white fs-5">Document</span></a>
                                </router-link>
                            </li>

                            <li class="nav-item mx-4 mt-56">
                                <div class="dropdown mt-0  ">
                                    <a href="#" class="d-flex align-items-center text-white text-decoration-none "
                                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img :src="getUserImageURL(user)" ui:alt="user.name"
                                            class="rounded-circle img-fluid mx-5" style="width: 50px; height: 50px;">

                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-light text-small shadow"
                                        aria-labelledby="dropdownUser1">
                                        <router-link :to="{ name: 'studentProfile', params: { userId: user.student_id } }"
                                            class="text-decoration-none">
                                            <li><a class="dropdown-item" href="#">Profile</a></li>
                                        </router-link>

                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li>
                                            <a class="dropdown-item cursor-pointer" @click="logout">Sign Out</a>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            <li class="mt-1">
                                <div>
                                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                        id="menu">

                                        <li class="nav-item mx-4">

                                            <a href="#" class="nav-link align-middle px-0" @click="logout">
                                                <i class='mx-2 fs-5 bx bx-exit' style='color: white'></i>
                                                <span class="ms-1 d-none d-sm-inline text-white fs-5">Logout</span>
                                            </a>



                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                        <hr>
                    </div>
                </div>

                <div class="col custom-scrollbar justify-content-center mt-2 overflow-scroll flex-nowrap">
                    <p class="lead mt-3 text-muted mx-2 mb-2 fs-1">Graduate Admission</p>

                    <hr>

                    <p class="lead text-center">
                        Once you have chosen a course, it is important to stay focused and motivated. It is also important
                        to be realistic about your expectations. College is a challenging experience, but it can also be a
                        very rewarding one. By choosing a course that you like, you can increase your chances of success.
                    </p>

                    <div
                        class="newtons-cradle m-auto position-relative d-flex align-items-center justify-content-center text-right">
                        <div class="newtons-cradle__dot position-relative d-flex align-items-center m-auto "></div>
                        <div class="newtons-cradle__dot position-relative d-flex align-items-center m-auto "></div>
                        <div class="newtons-cradle__dot position-relative d-flex align-items-center m-auto "></div>
                        <div class="newtons-cradle__dot position-relative d-flex align-items-center m-auto"></div>
                    </div>




                    <div class="bg-slate-100 mt-5 " style="height: 35px;">
                        <p class="text-center">2022 Graduate school-ITC, All Right Reserved </p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
// width:1236
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard_ContainerFluid {
    height: 370px;

}

.dashboard_Container {
    width: 100%;
    height: 60px;
    background-color: #243673;
}

.dashboard_Header {
    width: 200px;
}

.dashboard_textBox {
    width: 75%;
    overflow: hidden;
    word-wrap: break-word;
    font-size: 16px;

    @media screen and (max-width: 768px) {
        font-size: 12px;
    }

    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
}



.course {
    img {
        width: 8rem;
    }
}

.custom-scrollbar {
    width: 100%;
    height: 700px;
    overflow: scroll;
    word-wrap: break-word;
    font-size: 18px;

    @media screen and (max-width: 768px) {
        font-size: 14px;
    }

    @media screen and (max-width: 480px) {
        font-size: 14px;
    }
}


/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
}

/*Button*/
.card-button {
    padding: .3em;
    cursor: pointer;
    height: 50px;
    transition: .3s ease-in-out;
}

.card-button:hover {
    border: 1px solid #000000;
    background-color: gray;
}


.newtons-cradle {
    --uib-size: 80px;
    --uib-speed: 1.2s;
    --uib-color: #243673;
    width: var(--uib-size);
    height: var(--uib-size);

}

.newtons-cradle__dot {
    width: 25%;
    height: 100%;
    transform-origin: center top;


}

.newtons-cradle__dot::after {
    content: '';
    display: block;
    width: 100%;
    height: 25%;
    border-radius: 50%;
    background-color: var(--uib-color);
}

.newtons-cradle__dot:first-child {
    animation: swing var(--uib-speed) linear infinite;
}

.newtons-cradle__dot:last-child {
    animation: swing2 var(--uib-speed) linear infinite;
}

@keyframes swing {
    0% {
        transform: rotate(0deg);
        animation-timing-function: ease-out;
    }

    25% {
        transform: rotate(70deg);
        animation-timing-function: ease-in;
    }

    50% {
        transform: rotate(0deg);
        animation-timing-function: linear;
    }
}

@keyframes swing2 {
    0% {
        transform: rotate(0deg);
        animation-timing-function: linear;
    }

    50% {
        transform: rotate(0deg);
        animation-timing-function: ease-out;
    }

    75% {
        transform: rotate(-70deg);
        animation-timing-function: ease-in;
    }
}
</style>

