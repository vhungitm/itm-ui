declare module 'itm-ckeditor' {
  const ClassicEditorBuild: any;
  export = ClassicEditorBuild;
}

declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from 'itm-ckeditor';
  import * as React from 'react';

  export interface CKEditorProps {
    disabled?: boolean;
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    config?: any;
    onReady?: (editor: typeof ClassicEditor) => void;
    onChange?: (event: Event, editor: typeof ClassicEditor) => void;
    onBlur?: (event: Event, editor: typeof ClassicEditor) => void;
    onFocus?: (event: Event, editor: typeof ClassicEditor) => void;
    onError?: (event: Event, editor: typeof ClassicEditor) => void;
  }

  export const CKEditor: React.FunctionComponent<CKEditorProps>;
}
