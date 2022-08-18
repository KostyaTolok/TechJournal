import React, {useContext, useEffect, useState} from 'react';
import userIcon from '../images/user-icon.jpg';
import logoutIcon from '../images/logout.png';
import AuthContext from "../context/AuthContext";
import ErrorsList from "../components/ErrorsList";
import ReactTooltip from "react-tooltip";

function ProfilePage() {
    const {logoutUser, getUserProfile, changeUserProfile} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
    });
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [currentImageFile, setCurrentImageFile] = useState(null);

    useEffect(() => {
        async function loadUserInfo() {
            const response = await getUserProfile();
            const data = await response.json();
            if (response.status === 200) {
                setUserInfo({username: data.user.username, email: data.user.email});
                setUsername(data.user.username)
                setCurrentImage(data.image);
            } else {
                console.log(data.detail);
            }
        }

        loadUserInfo();
    }, []);

    function handleChange(event) {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    }

    async function handleAddImage(event) {
        event.preventDefault();
        let fileTypes = ['image/png', 'image/jpeg', "image/jpg"];
        let currentFiles = event.target.files;
        let tempErrors = [];
        if (currentFiles.length === 0) {
            tempErrors.push("Изображение пользователя не выбрано");
        } else if (!fileTypes.includes(currentFiles[0].type)) {
            tempErrors.push("Неверный формат изображения");
        } else if (currentFiles[0].size > 1000000) {
            tempErrors.push("Размер изображения превышает 1 мб");
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let tempImage = URL.createObjectURL(currentFiles[0]);
            setCurrentImage(tempImage);
            setCurrentImageFile(currentFiles[0]);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        let tempErrors = [];
        if (!userInfo.username) {
            tempErrors.push('Введите имя пользователя');
        }
        if (!userInfo.email) {
            tempErrors.push('Введите email');
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            const formData = new FormData();
            if (userInfo.username !== username) {
                formData.append('user.username', userInfo.username);
            }
            formData.append('user.email', userInfo.email);
            if (currentImageFile) {
                formData.append('image', currentImageFile, currentImageFile.name);
            }
            let response = await changeUserProfile(formData);
            if (response.status === 200) {
                alert('Данные успешно обновлены');
                setUsername(userInfo.username)
            } else {
                setErrors(["Ошибка при обновлении профиля"]);
            }
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 border-end text-center">
                    <form encType="multipart/form-data">
                        <label data-tip="Выбрать изображение" data-for="image-tooltip"
                               htmlFor="image" style={{cursor: "pointer"}}>
                            <input id="image" type="file" onChange={handleAddImage}
                                   accept=".jpg, .jpeg, .png" hidden/>
                            <img className="rounded-circle mt-5 user-image"
                                 src={currentImage ? currentImage : userIcon}
                                 alt="User"/>
                        </label>
                        <ReactTooltip id="image-tooltip" place="bottom" type="dark" effect="solid"/>
                    </form>
                    <h5 className="mt-3">{userInfo.username}</h5>
                    <p className="text-black-50 mt-3">{userInfo.email}</p>
                </div>
                <div className="col-md-9">
                    <h4 className="mt-4">Настройка профиля</h4>
                    <ErrorsList errors={errors}/>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input name="username" type="text"
                                   className="form-control" placeholder="Login"
                                   value={userInfo.username} onChange={handleChange}/>
                            <label htmlFor="username">Логин</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input name="email" type="text"
                                   className="form-control" placeholder="Email"
                                   value={userInfo.email} onChange={handleChange}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark btn-lg">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-end align-end mt-2">
                <a onClick={logoutUser} href="/src/pages"><img className="logout-icon" src={logoutIcon} alt="Logout"/></a>
            </div>
        </div>
    );
}

export default ProfilePage;