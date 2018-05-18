import React from 'react'
import {Alert, Button, Form} from 'reactstrap';

import TextInput from './TextInput'

export default ({submit, register, inputchange, errors}) => (
    <Form onSubmit={submit}>
        <h1>Log In</h1>
        {errors.non_field_errors ? <Alert color="danger">{errors.non_field_errors}</Alert> : ""}
        <TextInput name="username" label="Username" error={errors.username} onChange={inputchange}/>
        <TextInput name="password" label="Password" error={errors.password} type="password" onChange={inputchange}/>
        <Button type="submit" color="primary" size="lg">Log In</Button>
        <Button type="submit" color="primary" size="lg" onClick={register}>Register</Button>
    </Form>
)
