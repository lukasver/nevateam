import Project from '@/components/project';
import ProjectDetailLayout from '@/components/project-detail-layout';
import { Project as ProjectSchema } from '@/types/projects';
import { Container } from '@mui/material';
import { readFile } from 'fs/promises';

const getProjectData = async () => {
  const file = await readFile(
    `${process.cwd()}/public/assets/project.json`,
    'utf-8'
  );
  return ProjectSchema.parse(JSON.parse(file));
};

export default async function NevaTeam() {
  const project = await getProjectData();
  return (
    <Container maxWidth='xl'>
      <ProjectDetailLayout>
        <Project project={project} />
      </ProjectDetailLayout>
    </Container>
  );
}
