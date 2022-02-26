import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './postJob.css'
import Popup from 'react-popup';

const CREATE_JOB_MUTATION = gql`
   mutation postJob($id: ID!, $name: String!, $title: String!, $location: String!, $email: String!, $descrip: String!, $url: String!) {
      postJob(input: {
         title: $title,
         commitmentId: $id,
         companyName: $name,
         locationNames: $location,
         userEmail: $email,
         description: $descrip,
         applyUrl: $url
      }) {
         title
         commitment {
            id
         }
         company {
            name
         }
         locationNames
         userEmail
         description
         applyUrl
      }
   }
`;

const PostJob = () => {
   const [formState, setFormState] = useState({
      title: '',
      id: 'cjtu8esth000z0824x00wtp1i',
      companyName: 'Trimulabs',
      location: '',
      email: '',
      descrip: '',
      url: ''
   });
   
   const [postJob, { error }] = useMutation(CREATE_JOB_MUTATION, {
      variables: {
         id: formState.id,
         title: formState.title,
         name: formState.companyName,
         location: formState.location,
         email: formState.email,
         descrip: formState.descrip,
         url: formState.url
      }
   });

   const submitHandler = (e) => {
      e.preventDefault();
      postJob();
      if (!error) {
         Popup.alert("Job Created Successfully");
      }
      e.target.reset();
   }

   return (
      <div className="form-style-8">
         <h2>Job Post Form</h2>
         <div>
            <Popup />
         </div>
         <form onSubmit={submitHandler}>
            <input
               value={formState.title}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  title: e.target.value
               })
               }
               name="field1"
               type="text"
               placeholder="Job title"
            />
            <input
               value={formState.id}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  id: e.target.value
               })
               }
               disabled={true}
               name="field1"
               type="text"
               //placeholder="ID of the job"
            />
            <input
               value={formState.companyName}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  companyName: e.target.value
               })
               }
               disabled={true}
               name="field1"
               type="text"
               //placeholder="Company Name"
            />
            <input
               value={formState.location}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  location: e.target.value
               })
               }
               name="field1"
               type="text"
               placeholder="Job Location"
            />
            <input
               value={formState.email}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  email: e.target.value
               })
               }
               name="field2"
               type="email"
               placeholder="User Email"
            />
            <textarea
               value={formState.descrip}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  descrip: e.target.value
               })
               }
               type="text"
               placeholder="Description"
            />   
            <input
               value={formState.url}
               onChange={(e) =>
                  setFormState({
                  ...formState,
                  url: e.target.value
               })
               }
               name="field3"
               type="text"
               placeholder="URL"
            />
            <button type="submit"> Submit </button>
         </form>
      </div>
   );
};

export default PostJob;