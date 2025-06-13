import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import {z} from 'zod/v4';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateThreadProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'General Discussion',
  'Technical Support',
  'Feature Requests',
  'Bug Reports',
  'Announcements'
];

const ThreadSchema = z.object({
  title: z.string().min(1, {message: 'Title is required'}),
  category: z.enum(categories as [string, ...string[]], {message: 'Category is required'}),
  content: z.string().min(1, {message: 'Content is required'}),
})

type Thread = z.infer<typeof ThreadSchema>;

const CreateThread: React.FC<CreateThreadProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Thread>({
    resolver: zodResolver(ThreadSchema),
    defaultValues: {
      title: '',
      category: categories[0],
      content: '',
    },
  });
  const [showPreview, setShowPreview] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const onSubmit = (data: Thread) => {
    console.log(data);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <h2 className="text-2xl font-semibold">Create New Thread</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      {...register('title')}
                      placeholder="Enter thread title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      {...register('category')}
                    >
                      <SelectTrigger className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                          {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                      <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        }}
                        {...register('content')}
                      />
                      {errors.content && (
                        <p className="text-sm text-red-500">{errors.content.message}</p>
                      )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Create Thread
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateThread;
