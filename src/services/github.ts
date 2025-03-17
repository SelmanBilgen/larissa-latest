const GITHUB_API_URL = 'https://api.github.com';

interface GitHubFile {
  path: string;
  content: string;
  sha: string;
}

interface GitHubImageFile {
  name: string;
  path: string;
  sha: string;
  download_url: string;
}

export const getFileContent = async (
  owner: string,
  repo: string,
  path: string,
  token: string
): Promise<GitHubFile> => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch file content');
  }

  const data = await response.json();
  return {
    path: data.path,
    content: atob(data.content),
    sha: data.sha,
  };
};

export const updateFile = async (
  owner: string,
  repo: string,
  path: string,
  content: string,
  sha: string,
  message: string,
  token: string
): Promise<void> => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: btoa(content),
        sha,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update file');
  }
};

export const getTranslationFiles = async (
  owner: string,
  repo: string,
  token: string
): Promise<GitHubFile[]> => {
  const paths = ['src/translations/en.ts', 'src/translations/el.ts', 'src/translations/tr.ts'];
  const files = await Promise.all(
    paths.map((path) => getFileContent(owner, repo, path, token))
  );
  return files;
};

// New functions for image management
export const listImages = async (
  owner: string,
  repo: string,
  token: string
): Promise<GitHubImageFile[]> => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/src/assets`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to list images');
  }

  const data = await response.json();
  return data
    .filter((file: any) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
    })
    .map((file: any) => ({
      name: file.name,
      path: file.path,
      sha: file.sha,
      download_url: file.download_url,
    }));
};

export const uploadImage = async (
  owner: string,
  repo: string,
  path: string,
  file: File,
  token: string
): Promise<void> => {
  // Convert file to base64
  const base64Content = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });

  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload image: ${file.name}`,
        content: base64Content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (
  owner: string,
  repo: string,
  path: string,
  sha: string,
  token: string
): Promise<void> => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Delete image: ${path}`,
        sha,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
}; 