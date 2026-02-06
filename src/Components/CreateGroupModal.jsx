import axios from "axios";
import { useState } from 'react';
import { serverEndpoint } from "../config/appConfig";
import { useSelector } from 'react-redux';

function CreateGroupModal({ show, onHide, onSuccess }) {
    const user = useSelector((state) => state.userDetails);
    const [formdata, setFormData] = useState({
        name: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const validate = () => {
        let isValid = true;
        const newErrors = {};
        if (formdata.name.trim().length < 3) {
            newErrors.name = "Name must be atleats 3 characters long";
            isValid = false;
        }
        if (formdata.description.trim().length < 5) {
            newErrors.description = "Description must be atleast 5 characters long";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formdata,
            [name]: value
        });

        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post(
                    `${serverEndpoint}/groups/create`,
                    { name: formdata.name, description: formdata.description },
                    { withCredentials: true }
                );
                const groupId = response.data.groupId;
                onSuccess({
                    name: formdata.name,
                    description: formdata.description,
                    _id: groupId,
                    membersEmail: [user.email],
                    adminEmail: user.email,
                    paymentStatus: {
                        amount: 0,
                        currency: "INR",
                        date: new Date().toISOString(),
                        isPaid: false,
                    },
                    thumbnail: "",
                    isPaid: false,
                });
                setFormData({ name: "", description: "" });
                onHide();
            } catch (errors) {
                console.log(errors);
                setErrors({ message: "unable to add group,please try again" });
            } finally {
                setLoading(false);
            }
        }

    };
    if (!show) {
        return null;
    }
    return (
        <div className="modal show d-block">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header border-0">
                            <h5>Create Group</h5>
                            <button type="button" className="btn-close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-lable small fw-bold ">Group Name</label>
                                <input type="text" className={errors.name ? 'form-control is-invalid' : 'form-control'} name="name" value={formdata.name} onChange={onChange} />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}

                            </div>
                            <div className="mb-3">
                                <label className="form-lable small fw-bold "> Description</label>
                                <input type="text" className={errors.description ? 'form-control is-invalid' : 'form-control'} name="description" value={formdata.description} onChange={onChange} />

                            </div>
                            {errors.description && (
                                <div className="invalid-feedback">
                                    {errors.description}
                                </div>
                            )}

                        </div>
                        <div className="model-footer border-0">
                            <button type="button" className="btn btn-light rounded-pill" onClick={onHide}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary max-4 rounded-pill" >
                                Add
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default CreateGroupModal;