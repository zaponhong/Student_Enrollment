
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: null,
            programs: [],
            courses: [],
            totalCourse: 0,
            currentDateTime: null,
            deadline: "",
            formattedTime: "",
            formattedDate: "",
            timerInterval: null
        };
    },

    mounted() {
        this.fetchInfoUser();
        this.fetchLoggedInUser();

        setInterval(() => {
            this.currentDateTime = new Date();
        }, 1000);

        this.timerInterval = setInterval(this.remainingTime, 1000); // Update every 1 second
        this.remainingTime(); // Initial update


    },

    beforeDestroy() {
        clearInterval(this.timerInterval);
    },

    methods: {

        async fetchLoggedInUser() {
            try {
                const response = await axios.get('http://localhost:8000/api/student/info'); // Change this URL if needed
                // console.log(response.data);
                this.user = response.data;

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },

        getUserImageURL(user) {
            if (user.image) {
                const imageUrl = `http://localhost:8000/storage/${user.image}`;
                return imageUrl;
            } else {
                const imageAuto =
                    'https://gic.itc.edu.kh/storage/field-studies/August2021/Master%20of%20Engineering-1.png';
                return imageAuto;
            }
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

                    this.totalCourse = response3.data.length;

                    // console.log(response3.data);
                    // console.log(this.totalCourse);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });


        },


        fetchCourseUser() {
            const programId = this.$route.params.programId;
            console.log('Program ID:', programId); // Check the programId


            axios.get(`http://localhost:8000/api/student/showProgram/${programId}/courses`)
                .then(response3 => {
                    this.courses = response3.data.all_courses;
                    this.deadline = response3.data.course_with_longest_deadline;

                    // this.selectedProgram = this.programs.find(program => program.id === programId);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });

        },

        remainingTime() {
            if (!this.deadline) return '';

            // Calculate the remaining time
            const deadline = new Date(this.deadline.deadline);
            const now = new Date();

            const timeDifference = deadline - now;

            if (timeDifference <= 0) {
                clearInterval(this.timerInterval); // Stop the timer when the deadline is reached
                // this.formattedTime = "Deadline expired!!";
                return "Deadline expired!"; // Return the message directly
            }
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            //   return `${days} days ${hours} hours ${minutes} minutes ${seconds}s`;
            this.formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        },
    },
};
</script>

<template>
    <div v-if="user">
        <div class="dashboard_ContainerFluid">
            <div class="row flex-nowrap p-0">
                <div class="position-fixed col-lg-2 col-xl-2 bg-[#243673]" style="height: 700px; z-index: 3;">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 text-white">

                        <router-link :to="{ name: 'studentDashboard', params: { userId: user.student_id } }"
                            class="text-decoration-none">
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


                        <div class=" align-items-center ">

                            <div :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'importantDate' }]">
                                <router-link :to="{ name: 'studentImportantDate', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link align-middle px-0  mx-4">
                                        <i class='mx-2 bx bxs-calendar-event bx-rotate-180 fs-5 text-white'></i>

                                        <span
                                            class="lead ms-1 d-none d-sm-inline text-white fs-5 hover-overlay">Events</span>
                                    </a>
                                </router-link>
                            </div>


                            <div :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'documents' }]">
                                <router-link :to="{ name: 'studentDocument', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link px-0 align-middle  mx-4">
                                        <i class='mx-2 bx bxs-file-doc fs-5 text-white'></i>
                                        <span class="lead ms-1 d-none d-sm-inline text-white fs-5">Documents</span></a>
                                </router-link>
                            </div>



                            <div class="nav-item mx-2">
                                <a href="#" class="nav-link align-middle px-0  mx-4">
                                    <i class='mx-2 bx bx-book-open fs-5 text-white'></i>
                                    <span class="lead ms-1 d-none d-sm-inline text-white fs-5">My
                                        Courses</span>
                                </a>

                                <div class="align-items-center m-auto mx-5 py-2 w-75">

                                    <li>
                                        <router-link :to="{ name: 'studentMyCourse', params: { userId: user.student_id } }"
                                            class="lead fs-6 text-decoration-none text-white"
                                            :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'approved' }]">
                                            Approved
                                        </router-link>

                                    </li>

                                    <li>
                                        <router-link
                                            :to="{ name: 'studentEnrollCourse', params: { userId: user.student_id, programId: programs.id } }"
                                            class="lead fs-6 text-decoration-none text-white"
                                            :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'enroll' }]">
                                            Enroll
                                        </router-link>

                                    </li>

                                    <li>
                                        <router-link
                                            :to="{ name: 'studentDraftCourse', params: { userId: user.student_id } }"
                                            class="lead fs-6 text-decoration-none text-white"
                                            :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'requested' }]">
                                            Requested
                                        </router-link>
                                    </li>
                                </div>
                            </div>

                            <div :class="['nav-item', 'type', 'btn', { 'active': activeNavItem === 'programs' }]">
                                <router-link :to="{ name: 'studentCourse', params: { userId: user.student_id } }"
                                    class="text-decoration-none">
                                    <a href="#" class="nav-link align-middle px-0  mx-4">
                                        <i class='mx-2 bx bxs-dashboard bx-rotate-180 fs-5 text-white'></i>
                                        <span
                                            class="lead ms-1 d-none d-sm-inline text-white fs-5 hover-overlay">Program</span>
                                    </a>
                                </router-link>
                            </div>






                            <div class="nav-item">
                                <p class="lead mt-5 text-white fs-6  text">{{ currentDateTime }}</p>

                            </div>

                        </div>

                        <hr>
                    </div>
                </div>

                <div class="col custom-scrollbar overflow-scroll  p-0" style="height: 700px; margin-left: 15%;">
                    <div class="position-fixed h-18 d-flex justify-content-between bg-white"
                        style="z-index: 2; width: 80%; margin-left: 2%;">

                        <div class="w-75">
                            <p class="lead text-muted mx-5 mt-1 fs-2  ">{{ programs.name }} </p>
                            <li class="lead mx-5 fs-6 fw-bold">program view > program detail</li>
                        </div>

                        <div class="d-flex bg-white ">
                            <div class="dropdown mt-3 " style="margin-left: 15%;">
                                <a href="#" class="d-flex align-items-center text-white text-decoration-none "
                                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img :src="getUserImageURL(user)" ui:alt="user.name"
                                        class="rounded-circle img-fluid mx-5" style="width: 50px; height: 50px;">

                                </a>
                                <ul class="dropdown-menu dropdown-menu-light text-small shadow"
                                    aria-labelledby="dropdownUser1">
                                    <router-link :to="{ name: 'studentProfile', params: { userId: user.student_id } }"
                                        class="text-decoration-none">
                                        <li><a class="dropdown-item " href="#">Profile</a></li>
                                    </router-link>
                                    <li class="mt-1">
                                        <a href="#" class="dropdown-item " @click="logout">
                                            <span class="ms-1 d-none d-sm-inline">Logout</span>
                                        </a>
                                    </li>

                                </ul>
                            </div>

                            <i class='bx bx-bell fs-1 mt-3 mx-4  text-[#233673]'></i>


                        </div>


                    </div>

                    <div class="mt-5 py-4"></div>

                    <div class="m-auto mt-2 border-4 rounded-4 py-4 border-[#243673]" v-if="programs"
                        style="width: 85%; height: 570px; z-index: 1;">

                        <p class="lead mx-4 fs-3 fw-bold text-center text-[#243673]">Master's Degree</p>

                        <div class="d-flex ">
                            <img :src="getUserImageURL(programs)" :alt="programs.name" class="rounded-circle img-fluid mx-5"
                                style="width: 100px; height: 100px;">
                            <div class="mx-2">
                                <p class="lead mt-2 fw-bold fs-5">Institute of Technology of Cambodia</p>
                                <p class="lead fs-6">Phnom Penh, Cambodia</p>

                            </div>

                        </div>

                        <div class=" custom-scrollbar overflow-scroll m-auto" style="height: 70%; width: 90%;">

                            <div class="border-3 rounded-3 border-dashed border-[#243673] mt-1 py-3 m-auto dashboard_textBox overflow-scroll"
                                style="height: 80%; width: 100%;">

                                <div class="w-90 d-flex justify-content-between m-auto ">

                                    <table class="table m-auto w-75 mx-2">
                                        <thead>
                                            <tr class="table-secondary">
                                                <th scope="col" class="text-center lead fw-bold fs-5">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            <th scope="row" class="lead fs-6 "> &emsp;{{ programs.description }}</th>


                                        </tbody>
                                    </table>

                                    <table class="table mt-0 mx-2 w-25">
                                        <thead>
                                            <tr class="table-secondary">
                                                <th scope="col" class="text-center lead fw-bold fs-5">Total Courses</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">

                                            <th scope="row" class="text-center border-0 ">
                                                <p class="lead fw-bold text-secondary border-0">{{ totalCourse }}</p>
                                            </th>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="w-90 d-flex justify-content-between m-auto mt-3">

                                    <table>
                                        <thead>
                                            <tr class="table-secondary">
                                                <th scope="col" class="text-center lead fw-bold fs-5">Total Credits</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">

                                            <th scope="row" class="text-center border-0">
                                                <p class="lead fw-bold text-[#243673]">54</p>
                                            </th>

                                        </tbody>
                                    </table>

                                    <table class="table  mt-0 mx-2 w-25">
                                        <thead>
                                            <tr class="table-secondary">
                                                <th scope="col" class="text-center lead fw-bold fs-5">Total Credits</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">

                                            <th scope="row" class="text-center border-0">
                                                <p class="lead fw-bold text-[#243673]">54</p>
                                            </th>

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div class="d-flex m-auto justify-content-around text-center">

                                <div class="mt-4 dashboard_textBox ">

                                    <router-link :to="{ name: 'studentCourse', params: { userId: user.student_id } }"
                                        class="text-decoration-none ">
                                        <button
                                            @click="$router.push({ name: 'studentCourse', params: { userId: user.student_id } })"
                                            class="bg-[#243673] positon-relative rounded-2 border-1 h-10 w-25 text-white fw-bold ">
                                            Back

                                        </button>
                                    </router-link>


                                </div>

                                <div class="mt-4 dashboard_textBox ">

                                    <router-link
                                        :to="{ name: 'studentEnrollCourse', params: { userId: user.student_id, programId: programs.id } }"
                                        class="text-decoration-none ">
                                        <button
                                            @click="$router.push({ name: 'studentEnrollCourse', params: { userId: user.student_id, programId: programs.id } })"
                                            class="bg-[#243673] dashboard_textBox positon-relative rounded-2 border-1 h-10 w-25 text-white fw-bold ">
                                            Courses's List

                                        </button>
                                    </router-link>

                                </div>

                            </div>

                        </div>




                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" >
// width:1236
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

.dashboard_textBox {
    width: 75%;
    overflow: hidden;
    word-wrap: break-word;
    font-size: 16px;

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
</style>
