import { useNavigate, useParams } from "react-router-dom";
import {
  AddTodoApi,
  RetrieveTodoApi,
  UpdateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const navigate = useNavigate();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => retriveTodo(), [id]);

  function retriveTodo() {
    if (id != -1) {
      RetrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id == -1) {
      AddTodoApi(username, todo)
        .then(navigate("/todos"))
        .catch((error) => console.log(error));
    } else {
      console.log(todo);
      UpdateTodoApi(username, id, todo)
        .then(navigate("/todos"))
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {};
    if (values.description.length < 5) {
      errors.description = "Enter at least 5 char";
    }
    if (values.targetDate == null || values.targetDate == "") {
      errors.targetDate = "Enter a target date";
    }
    console.log(values);
    return errors;
  }

  return (
    <div className="container">
      <h1>Enter todo Details Here</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <div>
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    type="text"
                    className="form-control"
                    name="description"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    type="date"
                    className="form-control"
                    name="targetDate"
                  />
                </fieldset>
                <div>
                  <button className="btn btn-success m-5" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoComponent;
