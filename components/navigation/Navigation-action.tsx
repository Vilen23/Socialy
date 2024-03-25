"use client"

import { Plus } from 'lucide-react'
import { ActionToolTip } from '@/components/action-tooltip'
import { motion } from 'framer-motion'
import { useModal } from '@/hooks/use-modal-store'

const NavigationAction = () => {
  const {onOpen} = useModal();


  return (
    <motion.div
    initial={{scale:0,opacity:0,y:-100}}
    animate={{scale:1,opacity:1,y:0}}
    transition={{duration:0.2,ease:"easeInOut"}}
    >
      <ActionToolTip
      side='right'
      align='center'
      label='Create a server'
      >
      <button className='group flex items-center' onClick={()=>onOpen("createServer")}>
        <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-white dark:bg-neutral-700 group-hover:bg-emerald-500'>
          <Plus className='group-hover:text-white transition text-emerald-500' size={25}/>
        </div>
      </button>
      </ActionToolTip>  
    </motion.div>
  )
}

export default NavigationAction
