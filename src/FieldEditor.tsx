import { CKEditor, CKEditorProps } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'itm-ckeditor';
import React from 'react';

export interface FieldEditorProps extends CKEditorProps {
  [key: string]: any;
}

export const FieldEditor = (props: FieldEditorProps) => {
  let { isInvalid, className, ...fieldProps } = props;
  if (isInvalid)
    className = className ? `${className} is-invalid` : 'is-invalid';

  return (
    <div className={className}>
      <CKEditor {...fieldProps} editor={ClassicEditor} />
    </div>
  );
};
